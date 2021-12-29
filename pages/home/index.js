import React, { useState } from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import SidebarWithHeader from '../../component/sidebar';

const LinkItems = [
    { name: 'Home', icon: FiHome, href: '/home' },
    { name: 'Trending', icon: FiTrendingUp, href: '/home' },
    { name: 'Explore', icon: FiCompass, href: '/home' },
    { name: 'Favourites', icon: FiStar, href: '/home' },
    { name: 'Settings', icon: FiSettings, href: '/home' },
];

export default function Home({
    children,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <SidebarWithHeader>
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <h1>Home</h1>
            </Box>
        </SidebarWithHeader>
    );
}
