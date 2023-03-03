interface HeaderProps {
  name: string;
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[]
}

interface TotalProps {
  totalCount: number;
}

const Header = (props: HeaderProps) => {
  return (
    <h1>{props.name}</h1>
  );
};

const Content = (props: ContentProps) => {
  return (
    <div>
      <p>{props.courseParts[0].name} {props.courseParts[0].exerciseCount}</p>
      <p>{props.courseParts[1].name} {props.courseParts[1].exerciseCount}</p>
      <p>{props.courseParts[2].name} {props.courseParts[2].exerciseCount}</p>
    </div>
  );
};

const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.totalCount}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalCount={total} />
    </div>
  );
};

export default App;
