import React from "react";

function CourseProgram() {
  return (
    <div className="bg-white font-poppins text-black flex">
      <div
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="landing/Course.png"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
          alt=""
        />
      </div>
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "14px",
        }}
        className="px-8"
      >
        <h1 className="text-[#263238] text-4xl font-bold mb-8 text-right">
          Join Our Career Course Program
        </h1>
        <p className="text-right mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eius
          porro ad repellendus deleniti. Nemo vel, facere praesentium, dolorum
          doloremque obcaecati impedit laborum fugit pariatur provident officia
          non, tenetur excepturi distinctio commodi fugiat qui consequuntur.
          Iure totam, mollitia beatae voluptates natus tempore necessitatibus
          deleniti quos a incidunt repellendus ad aperiam aspernatur illum
          tenetur? Saepe itaque numquam quaerat totam fugiat aperiam!
        </p>
        <button className="btn btn-square h-16 w-72 bg-bt text-white">
          Enroll in Career Courses
        </button>
      </div>
    </div>
  );
}

export default CourseProgram;
