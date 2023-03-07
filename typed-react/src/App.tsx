interface HeaderProps {
  name: string;
}

interface ContentProps {
  courseParts: CoursePart[]
}

interface TotalProps {
  totalCount: number;
}

interface CoursePartBase {
  id: number;
  name: string;
  exerciseCount: number;
}

interface CoursePartDescr extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescr {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescr {
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescr {
  requirements: string[];
  kind: "special"
}

type CoursePart =
  CoursePartBasic |
  CoursePartGroup |
  CoursePartBackground |
  CoursePartSpecial;

const Header = (props: HeaderProps) => {
  return (
    <h1>{props.name}</h1>
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const renderBase = (part: CoursePartBase): JSX.Element => {
    return (
      <>
        <h3>{part.name}</h3>
        <p>Number of exercises: {part.exerciseCount}</p>
      </>
    );
  };
  const renderDescr = (part: CoursePartDescr): JSX.Element => {
    return (
      <>
        {renderBase(coursePart)}
        <p>Description: {part.description}</p>
      </>
    );
  };
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          {renderDescr(coursePart)}
        </div>
      );
    case "group":
      return (
        <div>
          {renderBase(coursePart)}
          <p>Number of group projects: {coursePart.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          {renderDescr(coursePart)}
          <p>Background material: <a href={coursePart.backroundMaterial}>{coursePart.backroundMaterial}</a></p>
        </div>
      );
    case "special":
      return (
        <div>
          {renderDescr(coursePart)}
          <p>
            Required skills: {coursePart.requirements.join(', ')}
          </p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part: CoursePart) => (
        <Part key={part.id} coursePart={part} />
      ))}
    </div>
  );
};

const Total = (props: TotalProps) => {
  return (
    <h4>
      Total number of exercises{" "}
      {props.totalCount}
    </h4>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      id: 1,
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      id: 2,
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      id: 3,
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      id: 4,
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      id: 5,
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      id: 6,
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
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
