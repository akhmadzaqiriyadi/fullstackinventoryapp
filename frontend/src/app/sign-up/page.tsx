'use client';

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Card } from "@nextui-org/card";
import axios from "axios";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/auth/register`, form);
      alert("Registrasi berhasil!");
      console.log(response.data);
    } catch (error) {
      alert("Registrasi gagal!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        <div className="text-2xl font-bold mb-6 text-center">Register</div>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Name"
            placeholder="Masukkan nama Anda"
            value={form.name}
            name="name"
            onChange={handleChange}
            isRequired
          />
          <Spacer y={4} />
          <Input
            type="email"
            label="Email"
            placeholder="Masukkan email Anda"
            value={form.email}
            name="email"
            onChange={handleChange}
            isRequired
          />
          <Spacer y={4} />
          <Input
            type="password"
            label="Password"
            placeholder="Masukkan password Anda"
            value={form.password}
            name="password"
            onChange={handleChange}
            isRequired
          />
          <Spacer y={4} />
          <Button type="submit" color="primary" className="w-full">
            Register
          </Button>
        </form>
        <Spacer y={2} />
        <div className="text-center">
          Sudah punya akun? <a href="/sign-in" className="text-blue-500">Login</a>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
