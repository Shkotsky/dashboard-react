export const removePropagation = (
  e:
    | React.MouseEvent<HTMLDivElement, MouseEvent>
    | React.MouseEvent<HTMLInputElement, MouseEvent>
) => {
  e.stopPropagation();
};
