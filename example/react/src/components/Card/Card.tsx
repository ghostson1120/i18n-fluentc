import React from "react";
import { Trans } from "react-i18next";
import "./Card.css";

interface Props {
  natural: boolean;
  dateBuilt: string;
  imageUrl: string;
  title: string;
  location: string;
  googleMapsUrl: string;
  description: string;
  key: number;
}

const Card: React.FC<Props> = (props) => {
  let dateText = props.dateBuilt;

  return (
    <div className="card">
      <img src={props.imageUrl} className="card--image" alt={props.title} />
      <div className="card--info">
        <div className="card--location--data">
          <img
            src="https://cdn.icon-icons.com/icons2/2073/PNG/512/location_map_twitter_icon_127126.png"
            className="card--pin"
            alt="pin"
          />
          <p className="card--location">{props.location.toUpperCase()}</p>
          <a
            href={props.googleMapsUrl}
            className="card--maps"
            target="_blank"
            rel="noreferrer"
          >
            <Trans i18nKey="view-on-google-map">View on Google Maps</Trans>
          </a>
        </div>
        <p className="card--title">{props.title}</p>
        <div className="card--date">{dateText}</div>
        <p className="card--description">{props.description}</p>
      </div>
    </div>
  );
};

export default Card;
