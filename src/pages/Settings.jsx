import Heading from "../ui/Heading";
import Row from '../ui/Row.jsx';
import UpdateSettingsForm from '../features/settings/UpdateSettingsForm.jsx';

function Settings() {
  return  <>
    <Heading as="h1">Update hotel settings</Heading>
    <Row>
      <UpdateSettingsForm/>
    </Row>
  </>


}

export default Settings;
