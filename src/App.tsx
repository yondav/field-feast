import { Route, Routes } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import { Home, Recipes, SingleRecipe } from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='recipes' element={<Recipes />} />
        <Route path='recipes/:id' element={<SingleRecipe />} />
      </Route>
    </Routes>
  );
}

export default App;
