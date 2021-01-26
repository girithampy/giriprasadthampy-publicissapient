import { useEffect, useState } from 'react'
import { Card, Button } from 'reactstrap';

// styles
import styles from './../styles/Filter.module.css'

const filterConfig = [
    {
        filterName: 'launch_year',
        filterTitle: 'Launch Year',
        filters: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
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
    },
]

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
            }
        }

        onFilterChange(updatedFilter)
    }
    return (<Card className={styles.filterContainer}>
        <div>
            <h3>Filters</h3>
        </div>
        {filterConfig.map((config, i) => (
            <div key={i}>
                <h5>{config.filterTitle}</h5>
                <hr />
                <div className={styles.filterSectionWrap}>
                    {config.filters.map((f, _i) =>
                        <Button
                            key={`button${_i}`}
                            className={filter[config.filterName] === f ? styles.activefilterButton : styles.filterButton}
                            onClick={() => applyFilter(config.filterName, f)}>{f}</Button>
                    )}
                </div>
            </div>
        ))}
    </Card>)
}

export default Filter;

