/** @jsxImportSource @emotion/react */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@react-redux-todos/core-components';
import { FILTERED_BY_ALL, FILTERED_BY_ACTIVE, FILTERED_BY_COMPLETED } from '@react-redux-todos/core-constants';
import { Filter as FilterWrapper } from '@react-redux-todos/core-layouts';

import { filterByActive, filterClear, filteredByCompleted } from './todoSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filteredBy = useSelector((state) => state.todos.filteredBy);

  const handleFilter = (type) => () => {
    const types = {
      [FILTERED_BY_ALL]: filterClear,
      [FILTERED_BY_ACTIVE]: filterByActive,
      [FILTERED_BY_COMPLETED]: filteredByCompleted,
    };

    if (!types[type]) {
      return false;
    }

    return dispatch(types[type]());
  };

  const isActiveAll = filteredBy === FILTERED_BY_ALL;
  const isActiveActive = filteredBy === FILTERED_BY_ACTIVE;
  const isActiveCompleted = filteredBy === FILTERED_BY_COMPLETED;

  return (
    <FilterWrapper>
        <Button
          variant={FILTERED_BY_ALL}
          onClick={handleFilter(FILTERED_BY_ALL)}
          isActive={isActiveAll}>
          All
        </Button>
        <Button
          variant={FILTERED_BY_ACTIVE}
          onClick={handleFilter(FILTERED_BY_ACTIVE)}
          isActive={isActiveActive}>
          Active
        </Button>
        <Button
          variant={FILTERED_BY_COMPLETED}
          onClick={handleFilter(FILTERED_BY_COMPLETED)}
          isActive={isActiveCompleted}>
          Completed
        </Button>
    </FilterWrapper>
  );
};
