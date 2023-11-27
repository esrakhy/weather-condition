import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// components
import Image from '../../components/Image';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
}));

// ----------------------------------------------------------------------
const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(45),
  height: theme.spacing(45),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));
// -----------------------------------------------------------------------
VerticalWidgetSummary.propTypes = {
  image: PropTypes.any,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error'])
};

export default function VerticalWidgetSummary({ title, image, subtitle, color = 'primary' }) {
  return (
    <RootStyle
      sx={{
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
      }}
    >
      <div>
        <Typography variant="h4" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      </div>
      <IconWrapperStyle >
        <Image alt={title} src={image} ratio="1/1" />
      </IconWrapperStyle>
    </RootStyle>
  );
}
