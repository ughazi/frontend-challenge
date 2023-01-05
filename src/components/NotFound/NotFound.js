import { constants } from '../../constants';

export const NotFound = () => {
  return (
    <div className="page-container">
      <div className="row">
        <span className="page-heading">{constants.ROUTE_NOT_FOUND_ERROR}</span>
      </div>
    </div>
  );
};
