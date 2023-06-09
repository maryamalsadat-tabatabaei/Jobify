const FormRowSelect = ({
  labelText,
  name,
  value,
  list: selectList,
  handleChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        className="form-select"
        onChange={handleChange}
      >
        {selectList?.map((selectItem, index) => {
          return (
            <option key={index} value={selectItem}>
              {selectItem}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
