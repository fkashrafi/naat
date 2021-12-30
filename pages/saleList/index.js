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
    'Name',
    'Phone',
    'Date',
    'InVoice',
    'Books/Qty',
    'Amount',
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
    saleList
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    //await responce 
    console.log("[saleList]", saleList);
    const router = useRouter();

    const sum = (arr, key) => {
        return arr.reduce((a, b) => a + (b[key] || 0), 0);
    }

    return (
        <SidebarWithHeader>
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <div>
                    <Button
                        onClick={() => window.print()}
                        colorScheme='teal'
                        variant='solid' >
                        print
                    </Button>
                    <br />
                </div>
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
                        {saleList.map(({
                            _id,
                            c_name,
                            c_number,
                            date,
                            invoice_num,
                            book_list
                        }, index) => <Tr key={`${_id}`}>
                                <Td>{c_name}</Td>
                                <Td>{c_number}</Td>
                                <Td>{date}</Td>
                                <Td>{invoice_num}</Td>
                                <Td>{book_list.map(({ book_name, qty }) => <span key={`${qty}`}>{`${book_name}/${qty},`}</span>)}</Td>
                                <Td>{sum(book_list, 'amount')}</Td>
                                {/* <Td>
                                <Button
                                    onClick={() => handleEdit(tableData)}
                                    leftIcon={<EditIcon />}
                                    colorScheme='teal'
                                    variant='solid' >

                                </Button>
                            </Td>
                            <Td>
                                <Button
                                    onClick={() => handleEditQty(tableData)}
                                    leftIcon={<EditIcon />}
                                    colorScheme='teal'
                                    variant='solid' >
                                        qty

                                </Button>
                            </Td> */}

                            </Tr>)}

                    </Tbody>
                    {/* <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot> */}
                </Table>
            </Box>
        </SidebarWithHeader>
    );
}



export const getStaticProps = async () => {
    const res = await fetch(`https://naat-68wtkmm83-luvrnight-gmailcom.vercel.app/api/sales`);
    const saleList = await res.json();
    return {
        props: {
            saleList
        }
    }
}
