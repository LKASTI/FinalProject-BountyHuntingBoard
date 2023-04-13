import {createClient} from "@supabase/supabase-js"

const URL = "https://yicmejvbbwwxvxjbbbsx.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpY21lanZiYnd3eHZ4amJiYnN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyNTUzNjYsImV4cCI6MTk5NjgzMTM2Nn0.I1YYhjpWo98x7SXnKX7_gL-rxJWQzxHYJyscSh4-xBU"

export const supabase = createClient(URL, API_KEY)