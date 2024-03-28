import "./Button.css";

export const Button = ({ handleSubmit }) => {
  const handleOnKeyDown = (e) => {
    e.key === "Enter" ? handleSubmit() : null;
  };

  return (
    <>
      <button onClick={handleSubmit} onKeyDown={handleOnKeyDown}>
        Search
      </button>
    </>
  );
};