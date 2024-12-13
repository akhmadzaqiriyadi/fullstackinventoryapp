'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Card } from "@nextui-org/card";
import axios from "axios";
import { Router } from "next/router";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/auth/login`, form);
      
      if (response.status === 200) {
        // Asumsikan token ada di response.data.token
        const token = response.data.token;
        
        // Simpan token di cookie
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24};`; // Menyimpan selama 1 hari
        
        // Redirect ke dashboard setelah login berhasil
        router.push('/admin');
      } else {
        alert("Login gagal!");
      }
    } catch (error) {
      console.log(error);
      alert("Login gagal!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        <div className="text-2xl font-bold mb-6 text-center">Login</div>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            value={form.email}
            name="email"
            onChange={handleChange}
          />
          <Spacer y={4} />
          <Input
            type="password"
            label="Password"
            value={form.password}
            name="password"
            onChange={handleChange}
            variant="faded"
          />
          <Spacer y={4} />
          <Button type="submit" color="primary" className="w-full">
            Login
          </Button>
        </form>
        <Spacer y={2} />
        <div className="text-center">
          Belum punya akun? <a href="/sign-up" className="text-blue-500">Register</a>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
