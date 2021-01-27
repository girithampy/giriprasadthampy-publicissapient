import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from '../styles/Filter.module.css';

const filterConfig = [
  {
    filterName: 'launch_year',
    filterTitle: 'Launch Year',
    filters: [
      '2006',
      '2007',
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020'
    ]
  },
  {
    filterName: 'launch_success',
    filterTitle: 'Successful Launch',
    filters: ['true', 'false']
  },
  {
    filterName: 'land_success',
    filterTitle: 'Successful Landing',
    filters: ['true', 'false']
  }
];

const Filter = (props) => {
  const { filter, onFilterChange } = props;

  const applyFilter = (filterName, value) => {
    let updatedFilter = filter;
    if (filter[filterName] === value) {
      delete updatedFilter[filterName];
    } else {
      updatedFilter = {
        ...filter,
        [filterName]: value
      };
    }

    onFilterChange(updatedFilter);
  };
  return (
    <div className={styles.filterContainer}>
      <div>
        <h2>Filters</h2>
      </div>
      {filterConfig.map((config, i) => (
        <div key={`filter${i}`}>
          <h3>{config.filterTitle}</h3>
          <hr />
          <div className={styles.filterSectionWrap}>
            {config.filters.map((f, _i) => (
              <button
                type="button"
                key={`button${_i}`}
                className={
                  filter[config.filterName] === f
                    ? styles.activefilterButton
                    : styles.filterButton
                }
                onClick={() => applyFilter(config.filterName, f)}>
                {f}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.instanceOf(Object).isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default React.memo(Filter);
