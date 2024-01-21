import React, { useEffect, useState } from 'react';
import './App.css';
import { ColorsView } from './components/pallet';
import { GeneratorOptions } from './components/GeneratorOptions';
import GeneratorSelector from './utils/colorUtils/ColorGeneratorSelector';
import { Generator } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { generatedColors } from './redux/features/colorGeneratorFeature/generatedColors';
import {
  setColors
} from './redux/features/colorGeneratorFeature/generatedColors';
import { filtersReducerState } from './redux/features/colorGeneratorFeature/generatorFilters';
import Banner from './components/livePreview/previewComponents/banner';
import { RootState } from './redux/store';
import LivePreview from './components/livePreview';
export type StateProps = {
  filters: filtersReducerState
  generatedColors: generatedColors
}
const App: React.FC = () => {
  const dispatch = useDispatch();
  const filtersState: StateProps = useSelector((state: StateProps) => state);
  const livePreviewState = useSelector((state: RootState) => state.livePreview.livePreviewState);
  const [selectedGenerator, setSelectedGenerator] = useState<Generator | null>(null);


  const handleSelectGenerator = (generator: Generator) => {
    setSelectedGenerator(generator);

    dispatch(setColors([]))
  };



  const generateColors = (generator: Generator | null, options: filtersReducerState): any[] => {
    if (generator) {
      // Call the selected generator's function with the appropriate parameters
      const colors = generator.function({
        count: options.count,
        baseColorOne: options.baseColorOne,
        baseColorTwo: options.baseColorTwo,
        lerp: options.lerp,
        hue: options.hue,
        lightness: options.lightness,
        saturation: options.saturation,
        random: options.genSingleColor,
        direction: options.gradDirection,
      });

      return colors;
    }

    return [];
  };
  useEffect(() => {
    const colors = generateColors(selectedGenerator, filtersState.filters)
    dispatch(setColors(colors))
  }, [dispatch, selectedGenerator, filtersState.filters]);
  return (
    <div className='md:min-h-screen h-full  lg:p-10'>
      <div className='flex flex-row w-2/3'>

        <div className={`flex flex-col `}>

          <div className="rounded-lg border shadow-sm p-4 " data-v0-t="card">

            <div className="flex  p-6">
              <div className='flex-col bg-gray-100 p-5 border rounded-md'>
                <h3 className="text-lg ">Choose Generator</h3>

                <GeneratorSelector onGeneratorSelect={handleSelectGenerator} />
              </div>


              <GeneratorOptions selectedGenerator={selectedGenerator}></GeneratorOptions>

            </div>
          </div>
          <div className='flex  my-5'>
            <div className='w-full rounded-lg border   bg-white lg:p-10'>
              <h1 className=' text-3xl px-2 text-gray-500'>Generated Colors</h1>
              {<ColorsView ></ColorsView>}
            </div>

          </div>
        </div>
        <div className='flex'>
          <LivePreview></LivePreview>

        </div>

      </div>

    </div>
  );
};

export default App;