export default function Cell({
  player,
  togglePlayer,
  disabled,
}: {
  player: "X" | "O" | null;
  togglePlayer: () => void;
  disabled: boolean;
}) {
  return (
    <div className={`cell ${disabled ? "disable" : ""}`} onClick={togglePlayer}>
      {player}
    </div>
  );
}
