const Account = ({ name, address, balance }) => {
  return (
    <div>
      <div>{`Account name: ${name}`}</div>
      <div>{`Account address: ${address}`}</div>
      <div>{`Account balance: ${balance}`}</div>
    </div>
  );
};

export default Account;
