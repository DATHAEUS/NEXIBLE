import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import DeleteModal from './../../../components/Delete-Modal';
import EditModal from './../../../components/Edit-Modal';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ userId, userData, page, limit }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteMod, setOpenDeleteMod] = useState(false);
  const [openEditMod, setOpenEditMod] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setOpenDeleteMod(true);
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setOpenEditMod(true);
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      {openDeleteMod && (
        <DeleteModal
          setIsOpen={setIsOpen}
          open={openDeleteMod}
          userId={userId}
          closeDelModal={setOpenDeleteMod}
          page={page}
          limit={limit}
        />
      )}
      {openEditMod && (
        <EditModal
          setIsOpen={setIsOpen}
          open={openEditMod}
          userId={userId}
          userData={userData}
          closeEditModal={setOpenEditMod}
          page={page}
          limit={limit}
        />
      )}
    </>
  );
}
