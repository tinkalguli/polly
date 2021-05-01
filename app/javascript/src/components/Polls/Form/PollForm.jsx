import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type = "create",
  title,
  options,
  setTitle,
  setOptions,
  loading,
  handleSubmit,
}) => {
  const handleSetOptions = (event, index) => {
    const data = [...options];
    data[index].content = event.target.value;

    setOptions(data);
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="w-3/4">
        <Input
          label="First option"
          placeholder="First option"
          value={options[0].content}
          onChange={(e) => handleSetOptions(e, 0)}
        />
        <Input
          label="Second option"
          placeholder="Second option"
          value={options[1].content}
          onChange={(e) => handleSetOptions(e, 1)}
        />
        <Input
          label="Third option"
          placeholder="Third option"
          value={options[2].content}
          onChange={(e) => handleSetOptions(e, 2)}
        />
        <Input
          label="Fourth option"
          placeholder="Fourth option"
          value={options[3].content}
          onChange={(e) => handleSetOptions(e, 3)}
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
