package ch.segginger.damian.seggiothek.controller;

import ch.segginger.damian.seggiothek.dto.LoanDTO;
import ch.segginger.damian.seggiothek.model.Loan;
import ch.segginger.damian.seggiothek.model.User;
import ch.segginger.damian.seggiothek.service.LoanService;
import ch.segginger.damian.seggiothek.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/loans")
public class LoanController {

    private final LoanService loanService;
    private final UserService userService;

    public LoanController(LoanService loanService, UserService userService) {
        this.loanService = loanService;
        this.userService = userService;
    }

    /**
     * POST /api/v1/loans
     * Erstelle einen Loan für den aktuell angemeldeten User
     */
    @PostMapping
    public ResponseEntity<LoanDTO> createLoan(
            @RequestBody LoanDTO loanDto,
            @AuthenticationPrincipal Jwt jwt) {

        String keycloakId = jwt.getSubject();
        String username = jwt.getClaimAsString("preferred_username");
        String name = jwt.getClaimAsString("name");

        // User wird hier automatisch erstellt falls nötig
        User user = userService.findOrCreateUser(keycloakId, name, username);

        Loan loan = loanService.createLoan(loanDto.getBookId(), user.getId());

        LoanDTO dto = new LoanDTO();
        dto.setId(loan.getId());
        dto.setBookId(loan.getBook().getId());
        dto.setUserId(loan.getUser().getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    /**
     * GET /api/v1/loans/my-loans
     * Alle Loans des aktuellen Users
     */
    @GetMapping("/my-loans")
    public ResponseEntity<?> getMyLoans(@AuthenticationPrincipal Jwt jwt) {
        String keycloakId = jwt.getSubject();
        String username = jwt.getClaimAsString("preferred_username");
        String name = jwt.getClaimAsString("name");

        User user = userService.findOrCreateUser(keycloakId, name, username);
        return ResponseEntity.ok(loanService.getLoansByUser(user.getId()));
    }
}