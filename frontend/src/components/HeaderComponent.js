import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Chip
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Menu as MenuIcon,
  ClearAll as ClearAllIcon,
  Analytics as AnalyticsIcon,
  Dataset as DatasetIcon,
  AutoGraph as AutoGraphIcon,
  TableChart as TableChartIcon,
  Refresh as RefreshIcon,
  ViewModule as ViewModuleIcon,
  Publish as PublishIcon
} from '@mui/icons-material';

const HeaderComponent = ({ onUploadClick, onClearAllData, onSidebarToggle, onVisualizationsToggle, onDatasetsToggle }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState('Home');
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUploadClick = () => {
    onUploadClick();
    handleMenuClose();
  };

  const handleClearAllData = () => {
    if (window.confirm('Barcha ma\'lumotlarni o\'chirishni xohlaysizmi? Bu amalni qaytarib bo\'lmaydi.')) {
      onClearAllData();
    }
    handleMenuClose();
  };

  const tabs = ['Home', 'Insert', 'Modeling', 'View', 'Help'];

  const ribbonGroups = {
    Home: [
      { label: 'Get Data', icon: <UploadIcon fontSize="small" />, onClick: handleUploadClick },
      { label: 'Transform', icon: <RefreshIcon fontSize="small" />, onClick: () => navigate('/data-view') },
      { label: 'New Visual', icon: <AnalyticsIcon fontSize="small" />, onClick: onVisualizationsToggle }
    ],
    Insert: [
      { label: 'Table', icon: <TableChartIcon fontSize="small" />, onClick: onVisualizationsToggle },
      { label: 'Chart', icon: <AutoGraphIcon fontSize="small" />, onClick: onVisualizationsToggle },
      { label: 'Text Box', icon: <ViewModuleIcon fontSize="small" />, onClick: () => {} }
    ],
    Modeling: [
      { label: 'Manage Relationships', icon: <DatasetIcon fontSize="small" />, onClick: () => navigate('/data-model') },
      { label: 'Fields', icon: <DatasetIcon fontSize="small" />, onClick: onSidebarToggle }
    ],
    View: [
      { label: 'Data View', icon: <TableChartIcon fontSize="small" />, onClick: () => navigate('/data-view') },
      { label: 'Model View', icon: <DatasetIcon fontSize="small" />, onClick: () => navigate('/data-model') }
    ],
    Help: [
      { label: 'Documentation', icon: <ViewModuleIcon fontSize="small" />, onClick: () => {} }
    ]
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#2b2b2b',
        zIndex: 1200,
        borderBottom: '1px solid #1e1e1e',
        height: '112px'
      }}
    >
      <Toolbar sx={{ minHeight: 56, gap: 2 }}>
        <Button
          color="inherit"
          onClick={() => navigate('/')}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            backgroundColor: '#f2c811',
            color: '#1f1f1f',
            '&:hover': { backgroundColor: '#f5d247' }
          }}
        >
          File
        </Button>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, letterSpacing: 0.3 }}>
          Power BI Desktop
        </Typography>
        <Chip label="Report" size="small" sx={{ backgroundColor: '#3a3a3a', color: '#fff' }} />
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Publish">
          <IconButton color="inherit" sx={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <PublishIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="More options">
          <IconButton color="inherit" onClick={handleMenuClick} sx={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              borderRadius: 2
            }
          }}
        >
          <MenuItem onClick={handleUploadClick}>
            <ListItemIcon>
              <AddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Upload Dataset</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClearAllData}>
            <ListItemIcon>
              <ClearAllIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Clear All Data</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
      <Toolbar
        sx={{
          minHeight: 56,
          backgroundColor: '#303030',
          gap: 2,
          alignItems: 'flex-start',
          borderTop: '1px solid #3b3b3b'
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                color: activeTab === tab ? '#f2c811' : '#fff',
                fontWeight: 600,
                textTransform: 'none',
                borderBottom: activeTab === tab ? '2px solid #f2c811' : '2px solid transparent',
                borderRadius: 0,
                px: 1
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>
        <Box sx={{ width: 1, height: 24, backgroundColor: '#4b4b4b', mx: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {(ribbonGroups[activeTab] || []).map((item) => (
            <Button
              key={item.label}
              onClick={item.onClick}
              startIcon={item.icon}
              sx={{
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.08)',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.16)' }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Toggle fields">
            <IconButton
              color="inherit"
              onClick={onSidebarToggle}
              sx={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Visualizations">
            <IconButton
              color="inherit"
              onClick={onVisualizationsToggle}
              sx={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <AnalyticsIcon />
            </IconButton>
          </Tooltip>
          {onDatasetsToggle && (
            <Tooltip title="Dataset panel">
              <IconButton
                color="inherit"
                onClick={onDatasetsToggle}
                sx={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <DatasetIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent; 
