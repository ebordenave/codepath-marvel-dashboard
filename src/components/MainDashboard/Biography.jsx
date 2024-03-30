import "./Biography.css";

export const Biography = ({
  characterName,
  characterDescription,
  characterThumbnail,
}) => {
  return (
    <>
      <div className="test">
        <div className="db-box name-container">{characterName}</div>
        <div className="db-box thumbnail-container">
          <div className="db-box thumbnail">
            <img src={characterThumbnail}></img>
          </div>
        </div>
        <div className="db-box description-container">
          {characterDescription}
        </div>
      </div>
    </>
  );
};