import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from '../features/cabins/CabinTable.jsx';
import AddCabin from '../features/cabins/AddCabin.jsx';
import CabinTableOperations from '../features/cabins/CabinTableOperations.jsx';

function Cabins() {


  // useEffect(function () {
  //   getCabins().then(data => console.log(data));
  // },[])

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations/>
      </Row>

      <Row>
        <CabinTable/>
      </Row>
  <AddCabin/>
    </>
  );
}

export default Cabins;
