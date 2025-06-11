'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { insertProfileSchema } from '@/db/schema';
import { CreateProfilePayload } from '@/typings/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

function CreateProfileForm() {
    const router = useRouter();
    const form = useForm<CreateProfilePayload>({
        resolver: zodResolver(insertProfileSchema),
        defaultValues: {
            name: { first: '', middle: '', last: '' },
            user_type: 'SELLER',
        },
    });

    const onSubmit = form.handleSubmit(async (values) => {
        const response = await fetch('/api/profile', {
            body: JSON.stringify(values),
            method: 'POST',
        });

        if (!response.ok) return;
        form.reset();
        router.refresh();
    });

    return (
        <Form {...form}>
            <form className="w-full max-w-md space-y-4" onSubmit={onSubmit}>
                <h1 className="text-2xl font-bold">Create Profile Form</h1>
                <FormField
                    name="name.first"
                    control={form.control}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{error?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    name="name.middle"
                    control={form.control}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Middle Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{error?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    name="name.last"
                    control={form.control}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{error?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    name="user_type"
                    control={form.control}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>I am a</FormLabel>
                            <FormControl>
                                <Tabs
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <TabsList className="w-full">
                                        {[
                                            {
                                                id: 1,
                                                label: 'Farmer',
                                                value: 'SELLER',
                                            },
                                            {
                                                id: 2,
                                                label: 'Buyer',
                                                value: 'BUYER',
                                            },
                                        ].map((item) => (
                                            <TabsTrigger
                                                key={item.id}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </Tabs>
                            </FormControl>
                            <FormMessage>{error?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <Button>Create Profile</Button>
            </form>
        </Form>
    );
}

export default CreateProfileForm;
