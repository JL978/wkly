import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import { Session } from "@supabase/supabase-js";

const Home: NextPage = () => {
	const [session, setSession] = useState<Session | null>();

	useEffect(() => {
		setSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<div className="flex justify-center items-center h-screen p-0 bg-slate-100">
			{!session ? (
				<Auth />
			) : (
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => supabase.auth.signOut()}
				>
					Log out
				</button>
			)}
		</div>
	);
};

export default Home;
