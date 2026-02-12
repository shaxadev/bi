import React from 'react';
import { Drawer, Box, Tooltip, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, DataObject as DataObjectIcon, TableChart as TableChartIcon } from '@mui/icons-material';

const SIDEBAR_WIDTH_PX = 64;
const HEADER_HEIGHT_PX = 112;

const MiniSidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const items = [
		{ key: 'report', icon: <HomeIcon />, path: '/', label: 'Report' },
		{ key: 'data', icon: <TableChartIcon />, path: '/data-view', label: 'Data' },
		{ key: 'model', icon: <DataObjectIcon />, path: '/data-model', label: 'Model' }
	];

	const isActive = (path) => {
		if (path === '/') return location.pathname === '/';
		return location.pathname.startsWith(path);
	};

	return (
		<Drawer
			variant="permanent"
			anchor="left"
			sx={{
				width: SIDEBAR_WIDTH_PX,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: SIDEBAR_WIDTH_PX,
					boxSizing: 'border-box',
					borderRight: '1px solid #1e1e1e',
					position: 'fixed',
					top: `${HEADER_HEIGHT_PX}px`,
					height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
					backgroundColor: '#1f1f1f'
				}
			}}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1, gap: 1 }}>
				{items.map((item) => (
					<Tooltip title={item.label} placement="right" key={item.key}>
						<IconButton
							size="large"
							onClick={() => navigate(item.path)}
							sx={{
								color: isActive(item.path) ? '#f2c811' : '#c9c9c9',
								backgroundColor: isActive(item.path) ? 'rgba(242,200,17,0.15)' : 'transparent',
								borderRadius: 1.5,
								'&:hover': { backgroundColor: 'rgba(242,200,17,0.2)' },
								mt: 0.5
							}}
						>
							{item.icon}
						</IconButton>
					</Tooltip>
				))}
			</Box>
		</Drawer>
	);
};

export default MiniSidebar; 
