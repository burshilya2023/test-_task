export const FilterText = (props: any) => {
  const { titleFilter, titleCard } = props;

  if (!titleFilter) return titleCard;
  const regexp = new RegExp(titleFilter, "ig");
  const mathValue = titleCard.match(regexp);

  if (mathValue) {
    return titleCard.split(regexp).map((s: string, i: number, array: []) => {
      if (i < array.length) {
        const c = mathValue.shift();
        return (
          <span key={i}>
            {s}
            <span key={s} style={{ color: "yellow" }}>
              {c}
            </span>
          </span>
        );
      }
      return s;
    });
  } else {
    titleCard;
  }
};
export const TextAreaLight = (props: any) => {
  const { tagsTask, editText } = props;

  if (!tagsTask) return editText;
  const regexp = new RegExp(/#.+?\w+/g, "ig");
  const mathValue = editText.match(regexp);

  if (mathValue) {
    return editText.split(regexp).map((s: string, i: number, array: []) => {
      if (i < array.length) {
        const c = mathValue.shift();
        return (
          <span key={i}>
            {s}
            <span key={s} style={{ color: "yellow" }}>
              {c}
            </span>
          </span>
        );
      }
      return s;
    });
  } else {
    editText;
  }
};
