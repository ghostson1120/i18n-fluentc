import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import Footer from "./components/Footer/Footer";
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t } = useTranslation();

  const Data = [
    {
      id: 1,
      title: t("parthenon"),
      location: t("greece"),
      googleMapsUrl: "https://goo.gl/maps/a2UaeW8LQQ6RvxD3A",
      natural: false,
      dateBuilt: t("parthenon-completed"),
      description: t("parthenon-description"),
      imageUrl: "https://source.unsplash.com/ilQmlVIMN4c",
    },
    {
      id: 2,
      title: t("mount-fuji"),
      location: t("japan"),
      googleMapsUrl: "https://goo.gl/maps/1DGM5WrWnATgkSNB8",
      natural: true,
      dateBuilt: t("fuji-completed"),
      description: t("fuji-description"),
      imageUrl: "https://source.unsplash.com/WLxQvbMyfas",
    },
    {
      id: 3,
      title: t("sydney-opera-house"),
      location: t("australia"),
      googleMapsUrl: "https://goo.gl/maps/bvUa3DjYZLp5BeaD6",
      natural: false,
      dateBuilt: t("opera-completed"),
      description: t("opera-description"),
      imageUrl: "https://source.unsplash.com/JmuyB_LibRo",
    },
    {
      id: 4,
      title: t("geirangerfjord"),
      location: t("norway"),
      googleMapsUrl: "https://goo.gl/maps/MLVd3w4bAxujF4mG7",
      natural: true,
      dateBuilt: t("fuji-completed"),
      description: t("geirangerfjord-description"),
      imageUrl: "https://source.unsplash.com/3PeSjpLVtLg",
    },
  ];
  
  console.log(Data)

  const cards = Data.map(item => {
    return (
      <Card 
        key={item.id}
        {...item}
      />
    )
  })


  return (
    <div className="App">
      <Navbar />
      <main>
        {cards}
      </main>
      <Footer />
    </div>
  );
}

export default App;