// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE, PATH_BOOK } from '../../../routes/paths';
// config
import { PATH_AFTER_LOGIN } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Book',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Management',
    icon: <Iconify icon="ic:round-grain" />,
    path: '/management',
  },
];

export default navConfig;
