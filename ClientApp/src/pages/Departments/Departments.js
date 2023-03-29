import React, { useState } from 'react';
import { HiUserGroup, HiOutlineDesktopComputer, HiOutlineCurrencyDollar } from "react-icons/hi";
import { DEFAULT_PAGE_HEADER_COLOR, DEFAULT_PAGE_HEADER_TEXT_COLOR, DEPARTMENTS_COLORS } from 'constants';
import { DisplayError, PageHeader, PageWrapper, Spinner } from 'components';
import { DEPARTMENTS_PAGE, DEPARTMENTS_ENDPOINTS } from 'constants';
import { useFetchEndpoint } from 'hooks';
import { MdLocationPin } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { Chart } from 'components';

import './Departments.css';

const ICONS = [
  <HiUserGroup />,
  <HiOutlineDesktopComputer />,
  <HiOutlineCurrencyDollar />
]

export function Departments() {
  const { data, loading, error } = useFetchEndpoint(DEPARTMENTS_ENDPOINTS.GET_WITH_DATA);
  const departmentsData = {
    departments: data.map(department => department.name),
    numbers: data.map(department => department.employeesCount)
  }

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <DisplayError
      error={error}
      redirectTo='/'
    />
  }

  return (
    <section className='departments'>
      <PageHeader
        color={DEFAULT_PAGE_HEADER_COLOR}
        textColor={DEFAULT_PAGE_HEADER_TEXT_COLOR}
        backTo='/'
      >
        {DEPARTMENTS_PAGE}
      </PageHeader>
      <PageWrapper>
        <div className='grid-container'>
          <div className='chart-container'>
            <Chart
              colors={DEPARTMENTS_COLORS}
              departmentsData={departmentsData}
            />
          </div>

          {data.map((department, index) => (
            <div key={department.id} className='department-data'>
              <h1
                style={{ backgroundColor: `rgb(${DEPARTMENTS_COLORS[index]}` }}
                className='department-name'
              >
                {department.name}
              </h1>
              <div
                style={{ borderBottom: `3px solid rgb(${DEPARTMENTS_COLORS[index]}` }}
                className='department-data-container'
              >
                <div className='department-data-row'>
                  < MdLocationPin />
                  <p>{department.location}</p>
                </div>
                <div className='department-data-row'>
                  <BsFillPersonFill />
                  <p>{department.employeesCount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageWrapper >
    </section >
  )
}
