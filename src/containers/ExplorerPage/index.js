import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './ExplorerPage.module.scss';

import { RefineByFilter, Search, Text, SortBy, BountyCard } from 'components';

const {
  bountiesStateSelector,
  rootBountiesSelector,
  categoriesSelector,
  rootCategoriesSelector
} = selectors;

const renderBounties = data => {
  return data.map((elem, idx) => {
    return (
      <div className={`${styles.bounty}`} key={'bounty' + idx}>
        <BountyCard bountyData={elem} />
      </div>
    );
  });
};

class ExplorerPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { loadCategories } = this.props;
    loadCategories();
  }

  render() {
    const { loading, error, bounties, count, categories } = this.props;

    if (error) {
      return <div>error...</div>;
    }

    return (
      <div className={`${styles.explorerPage}`}>
        <div className={`${styles.filterColumn}`}>
          <div className={`${styles.searchBar}`}>
            <Search />
          </div>
          <div className={`${styles.refineBy}`}>
            <RefineByFilter
              dropdown
              stages
              difficulty
              dropdownOptions={categories}
            />
          </div>
        </div>
        <div className={`${styles.bountiesColumn}`}>
          <div className={`${styles.sortByBar}`}>
            <div className={`${styles.count}`}>
              <Text style="H2" color="purple">
                {count}
              </Text>
              <Text style="H3" color="grey">
                Bounties
              </Text>
            </div>
            <div className={`${styles.sortBy}`}>
              <SortBy />
            </div>
          </div>
          <div className={`${styles.bountiesList}`}>
            {renderBounties(bounties)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  let bountiesState = rootBountiesSelector(state);
  let categoriesState = rootCategoriesSelector(state);

  return {
    categories: categoriesState.categories,
    bounties: bountiesState.bounties,
    count: bountiesState.count,
    ...bountiesStateSelector(state),
    ...categoriesSelector(state)
  };
};

ExplorerPage.propTypes = {
  bounties: PropTypes.array,
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadBounties, ...actions }),
  LoadComponent('')
)(ExplorerPage);

export default check;
