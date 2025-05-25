import Button from "./Button";

function Cross({onClose}) {
  return (
    <>
      <Button onclick={onClose}>
        {console.log('object')}
        <img className="h-9 w-9" src="/cross.png" alt="Cross" />
      </Button>
    </>
  );
}

export default Cross;
