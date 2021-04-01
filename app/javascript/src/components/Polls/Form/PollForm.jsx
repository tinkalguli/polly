import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type = "create",
  title,
  setTitle,
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