import styled from "styled-components";

import Spinner from '../../ui/Spinner.jsx';
import CabinRow from './CabinRow.jsx';
import { useCabins } from './useCabins.js';
import Table from '../../ui/Table.jsx';
import Menus from '../../ui/Menus.jsx';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty.jsx';

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;


function CabinTable() {
  const {isLoading, cabins, error} = useCabins();
const [searchParams] = useSearchParams();


  if(isLoading) return <Spinner/>;

  if(!cabins.length) return <Empty resourceName="cabins" />;
//filter
  const filterValue = searchParams.get('discount') || 'all';


  let filteredCabins;
  if(filterValue === 'all') filteredCabins = cabins;
  if(filterValue === 'no-discount') filteredCabins = cabins.filter((cabin)=> cabin.discount === 0);
  if(filterValue === 'with-discount') filteredCabins = cabins.filter((cabin)=> cabin.discount > 0);

  //sort

  const sortBy = searchParams.get('sortBy') || 'startDate-asc';

  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier) ;

  return (
    <Menus>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header >
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body data={sortedCabins} render={(cabin) => {
        return <CabinRow cabin={cabin} key={cabin.id}
        />}}/>
    </Table>
    </Menus>
  );
}

export default CabinTable;
