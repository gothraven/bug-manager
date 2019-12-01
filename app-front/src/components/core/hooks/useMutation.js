export default function useMutation(mutation) {
  console.log('useMutation', mutation)
  return [false, (data) => console.log(data)];
}
