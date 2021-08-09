import { Input } from 'antd';

export default function SearchBar() {
  return (
    <Input.Group>
      <Input.Search
        placeholder="input search text"
        allowClear={true}
        style={{ marginTop: '15px', width: '60%' }}
      />
    </Input.Group>
  );
}
