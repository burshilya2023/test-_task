import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="15" y="50" rx="2" ry="2" width="550" height="150" />
    <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
  </ContentLoader>
);
