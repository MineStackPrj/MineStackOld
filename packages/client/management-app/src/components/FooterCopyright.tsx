import React from 'react';

import { copyrightString } from '@/config';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

/**
 * footerにつけるcopyrightコンポーネント
 */
const FooterCopyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="" /* TODO: */>
        {copyrightString}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
export default FooterCopyright;
