import React from 'react';
import { FcDepartment, FcBusinessman } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  PageHeader,
  PageWrapper,
  Tile
} from 'components';
import {
  DEFAULT_PAGE_HEADER_COLOR,
  DEFAULT_PAGE_HEADER_TEXT_COLOR,
  HOME_PAGE
} from 'constants';
import './Home.css';

export function Home() {
  const navigate = useNavigate();

  function goToEmployees() {
    navigate('/view-employees')
  }

  function alertNotReady() {
    toast.error('This component is not ready yet');
  }

  return (
    <section>
      <PageHeader
        color={DEFAULT_PAGE_HEADER_COLOR}
        textColor={DEFAULT_PAGE_HEADER_TEXT_COLOR}
      >
        {HOME_PAGE}
      </PageHeader>
      <PageWrapper>
        <div className='tiles-container'>
          <Tile
            header="View Employees"
            icon={<FcBusinessman />}
            onClick={goToEmployees}
          />
          <Tile
            header="View Departments"
            subHeader="TO BE CONTINUED..."
            icon={<FcDepartment />}
            onClick={alertNotReady}
          />
        </div>
      </PageWrapper>
    </section>
  )
}
