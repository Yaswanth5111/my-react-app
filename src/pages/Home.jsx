import Card from "../components/Card";
import Button from "../components/Button";

const Home = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <Card title="Reusable Card" description="This is a reusable Card component.">
        <Button label="Click Me" onClick={handleClick} />
      </Card>
    </div>
  );
};

export default Home;
