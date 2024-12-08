CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


create policy "Anyone can upload an avatar."
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'avatars'::text));


create policy "Avatar images are publicly accessible."
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'avatars'::text));


create policy "Give users access to own folder 1rma4z_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'posts'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1rma4z_1"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'posts'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1rma4z_2"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'posts'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


create policy "images can view by anyone 1rma4z_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'posts'::text));



