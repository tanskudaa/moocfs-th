import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartVerbose extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartVerbose {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartVerbose {
  type: "submission";
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;


const assertNever = (value: never): never => {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
};


const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>;
};

const Part = ({ part }: { part: CoursePart }) => {
  const header = <div><b>{part.name} {part.exerciseCount}</b></div>;

  /*
   * I hate this boilerplate. It could be refactored to concat into result JSX,
   * but that seems overkill.
   * part.description can't be refactored into a general JSX const since
   * TypeScript can't ensure if that field exists outside the corresponding
   * switch-case.
   */
  switch (part.type) {
    case "normal":
      return (
        <div>
          {header}
          <i>{part.description}</i>
        </div>
      );

    case "groupProject":
      return (
        <div>
          {header}
          project exercises {part.groupProjectCount}
        </div>
      );

    case "submission":
      return (
        <div>
          {header}
          <i>{part.description}</i><br/>
          submit to {part.exerciseSubmissionLink}
        </div>
      );

    default:
      return assertNever(part);
  }
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  /*
   * I also hate how Part can't have a style-field so everything needs to be
   * wrapped inside a redundant div.
   */
  return (
    <>
      {courseParts.map(a => (
        <div key={a.name} style={({ margin: '1em 0'})}>
          <Part part={a} />
        </div>
      ))}
    </>
  );
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;