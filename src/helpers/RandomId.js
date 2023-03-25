export default function generateRandomID() {
  let randomID = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const charactersLength = characters.length;

  for (let i = 0; i < 10; i++) {
    randomID += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return randomID;
}
