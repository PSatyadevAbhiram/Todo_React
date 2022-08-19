import './DateComponent.css'

function DateComponent() {
  const date = new Date();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  console.log(date);

  return (
    <div className="date">
      <div className="__day">{day}</div>
      <div className="date__month">{month}</div>
      <div className="date__year">{year}</div>
    </div>
  );
}

export default DateComponent;
