import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type = "create",
  title,
  option1,
  option2,
  option3,
  option4,
  setTitle,
  setOption1,
  setOption2,
  setOption3,
  setOption4,
  loading,
  handleSubmit,
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Enter title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="w-3/4">
        <Input
          label="First option"
          placeholder="First option"
          value={option1}
          onChange={e => setOption1(e.target.value)}
        />
        <Input
          label="Second option"
          placeholder="Second option"
          value={option2}
          onChange={e => setOption2(e.target.value)}
        />
        <Input
          label="Third option"
          placeholder="Third option"
          value={option3}
          onChange={e => setOption3(e.target.value)}
        />
        <Input
          label="Fourth option"
          placeholder="Fourth option"
          value={option4}
          onChange={e => setOption4(e.target.value)}
        />
      </div>
      <div className="mt-6">
        <Button
          type="submit"
          buttonText={type === "create" ? "Create poll" : "Update poll"}
          loading={loading}
        />
      </div>
    </form>
  );
};

export default PollForm;