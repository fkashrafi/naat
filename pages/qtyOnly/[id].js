import React, { useEffect, useState, useMemo } from 'react';
import {
    IconButton,
    Button,
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
    Stack,
    FormControl,
    FormLabel,
    Input,
    Heading,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import SidebarWithHeader from '../../component/sidebar';
import moment from 'moment';

export default function BooksEditQty({
    children,
    bookData
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [date,setDate] = useState(moment().format('DD-MMM-YY'));
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setValue
    } = useForm({
        defaultValues: useMemo(() => {
            return bookData;
        }, [bookData])
    });

    // useEffect(
    //     () => {
    //         bookData && setValue(bookData)
    //     }, [bookData])

    function onSubmit(values) {
        let value = {
            ...values,
            inStock: String(Number(values.inStock) + Number(bookData.inStock)),
            inStockArr:[...bookData.inStockArr,`${date}/${values.inStock}`]
        }
        try {
            addMeetupHandler(value);
        } catch (error) {
            
        }finally{
            router.push('/bookList')
        }
    }

    async function addMeetupHandler(enterMeetupData) {
        const responce = await fetch('https://naat-68wtkmm83-luvrnight-gmailcom.vercel.app/api/books', {
            method: 'PUT',
            body: JSON.stringify(enterMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await responce.json();
        //await responce 
        console.log("[addMeetupHandler]", data);
    }



    return (
        <SidebarWithHeader>
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <Flex
                // align={'center'}
                // justify={'center'}
                >
                    <Box
                        w="full"
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Heading>EDdit  Book Form</Heading>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack
                                spacing={4}>

                                <HStack w="full">
                                    <Box minW="full" maxW="full">
                                        <FormControl id="book_name" isRequired>
                                            <FormLabel>Book Name</FormLabel>
                                            <Input
                                                disabled
                                                variant='filled'
                                                type="text"
                                                placeholder="Book Name"
                                                id="book_name"
                                                {...register("book_name", {
                                                    required: "This is required",
                                                })}
                                            />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <HStack w="full">
                                    <Box minW="full" maxW="full">
                                        <FormControl id="author" isRequired>
                                            <FormLabel>Author Name</FormLabel>
                                            <Input
                                                disabled
                                                variant='filled'
                                                type="text"
                                                id="author"
                                                {...register("author", {
                                                    required: "This is required",
                                                })}
                                                placeholder="Author Name"
                                            />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <HStack w="full">
                                    <Box minW="50%" maxW="full">
                                        <FormControl id="inStock" isRequired>
                                            <FormLabel>In Stock</FormLabel>
                                            <Input
                                                variant='filled'
                                                type="text"
                                                id="inStock"
                                                {...register("inStock", {
                                                    required: "This is required",
                                                })}
                                                placeholder="eg. 123" />
                                        </FormControl>
                                    </Box>
                                    <Box minW="50%" maxW="full">
                                        <FormControl id="price" isRequired>
                                            <FormLabel>Price</FormLabel>
                                            <Input
                                                disabled
                                                variant='filled'
                                                type="text"
                                                id="price"
                                                {...register("price", {
                                                    required: "This is required",
                                                })}
                                                placeholder="eg. 123" />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <Box minW="full" maxW="full">
                                    <Button
                                        type="submit"
                                        bg={'blue.400'}
                                        minW="full" maxW="full"
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Submit
                                    </Button>
                                </Box>
                            </Stack>
                        </form>
                    </Box>
                </Flex>
            </Box>
        </SidebarWithHeader>
    );
}


// export async function getStaticPaths() {
//     // const client = await MongoClient.connect("mongodb+srv://fahad:PS5AnhJcEpBED4q8@cluster0.txfhk.mongodb.net/meetups?retryWrites=true&w=majority")
//     // console.log("server running")
//     // const db = client.db();
//     // const meetupsCollection = db.collection('meetups');
//     // const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
//     // console.log("[MEET UPS]", meetups);
//     // client.close();


//     // return {
//     //     fallback: false,
//     //     paths: []
//     // }
// }


// export const getStaticProps =  (contex) => {
//     console.log("contex",contex);

//     //  // const { id } = contex.params;
//     // // // const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//     // // const res = await fetch(`${server}https://naat-68wtkmm83-luvrnight-gmailcom.vercel.app/api/books/${id}`);
//     // // const articles = await res.json();
//     // // console.log("res edit",res);


//     return {
//         props:{
//         contex,
//         fallback: false
//         }
//     }
// }

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps = async (contex) => {
    const res = await fetch(`https://naat-68wtkmm83-luvrnight-gmailcom.vercel.app/api/books/${contex.params.id}`);
    const bookData = await res.json();
    console.log("bookData", bookData);

    return {
        props: {
            bookData
        }
    }
}