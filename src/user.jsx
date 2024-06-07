import { TableRow, TableCell } from "@mui/material";

const UserData = ({ users }) => {
    return (
        <>
            {users.map((curUser) => (
                <TableRow key={curUser.id}>
                    <TableCell>{curUser.id}</TableCell>
                    <TableCell>{curUser.name}</TableCell>
                    <TableCell>{curUser.email}</TableCell>
                    <TableCell>{`${curUser.address.street}, ${curUser.address.city}, ${curUser.address.zipcode}`}</TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default UserData;
