import React, { useState, } from 'react';
import {
    Heading,
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
    Button,
    MenuDivider,
    MenuItem,
    MenuList,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
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
import { EditIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import { ReactText } from 'react';

import SidebarWithHeader from '../../component/sidebar';

const TableHead = [
    'Book Name',
    'Author',
    'In Stock',
    'Price',
    'Stock History',
    'Edit',
    'Edit Qty',
];
const TableData = [
    {
        'bookName': 'Naat Rang',
        'qty': 12,
        'sellPrice': 150,
        'costPrice': 120,
        'vol': 1,
    },
    {
        'bookName': 'Naat Rang 1',
        'qty': 12,
        'sellPrice': 150,
        'costPrice': 120,
        'vol': 2,
    },
    {
        'bookName': 'Naat Rang 3',
        'qty': 12,
        'sellPrice': 150,
        'costPrice': 120,
        'vol': 3,
    },
    {
        'bookName': 'Naat News 1',
        'qty': 102,
        'sellPrice': 150,
        'costPrice': 120,
        'vol': 1,
    },
    {
        'bookName': 'Naat Rang',
        'qty': 12,
        'sellPrice': 150,
        'costPrice': 120,
        'vol': 1,
    },
    {
        'bookName': 'Naat Rang 1',
        'qty': 12,
        'sellPrice': 150,
        'costPrice': 120,
        'vol': 2,
    },
    {
        'bookName': 'Naat Rang 3',
        'qty': 12,
        'sellPrice': 150,
        'costPrice': 120,
        'vol': 3,
    },
    {
        'bookName': 'Naat News 1',
        'qty': 102,
        'sellPrice': 150,
        'costPrice': 120,
        'vol': 1,
    },
];

export default function BookList({
    children,
    bookList
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    //await responce 
    console.log("[bookList]", bookList);
    const router = useRouter();
    const handleEdit = (id) => {
        router.push({
            pathname: `bookEdit/${id}`,
            asPath: "bookEdit/[_id]"
        });
    }

    const handleEditQty = (id) => {
        router.push({
            pathname: `qtyOnly/${id}`,
        })
    };

    const printDocument = () => {
        window.print();
    }

    return (
        <SidebarWithHeader>
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <div id="divToPrint">
                    <Button
                        onClick={printDocument}
                        colorScheme='teal'
                        variant='solid' >
                        print
                    </Button>
                    <br />
                    <Table
                        bg={useColorModeValue('white', 'gray.700')}
                        variant='striped'>
                        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                        <Thead>
                            <Tr>
                                {TableHead.map((tableHead, index) => <Th key={`${index}${tableHead}`}>
                                    <Heading as='h4' size='sm'>{tableHead}</Heading>
                                </Th>)}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {bookList.map((
                                {
                                    _id,
                                    book_name,
                                    author,
                                    inStock,
                                    inStockArr,
                                    price
                                },
                                index) => <Tr key={`${_id}`}>
                                    <Td>{book_name}</Td>
                                    <Td>{author}</Td>
                                    <Td>{inStock}</Td>
                                    <Td>{price}</Td>
                                    <Td>{inStockArr.map(v => <b key={`${v}`}>{`${v},`}</b>)}</Td>
                                    <Td>
                                        <Button
                                            onClick={() => handleEdit(_id)}
                                            leftIcon={<EditIcon />}
                                            colorScheme='teal'
                                            variant='solid' >

                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            onClick={() => handleEditQty(_id)}
                                            leftIcon={<EditIcon />}
                                            colorScheme='teal'
                                            variant='solid' >
                                            qty

                                        </Button>
                                    </Td>

                                </Tr>)}

                        </Tbody>
                    </Table>
                </div>
            </Box>

        </SidebarWithHeader>
    );
}



export const getStaticProps = async () => {
    const res = await fetch(`https://naat-68wtkmm83-luvrnight-gmailcom.vercel.app/api/books`);
    const bookList = await res.json();
    return {
        props: {
            bookList
        }
    }
}
// naat-68wtkmm83-luvrnight-gmailcom.vercel.app